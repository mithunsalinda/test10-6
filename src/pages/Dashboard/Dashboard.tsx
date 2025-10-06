import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Empty, List, Space, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { createDiagram } from "../../services/diagrams";
import type { Diagram } from "../../types/diagram";
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
const { Title, Text } = Typography;

export default function Dashboard() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [items, setItems] = useState<Diagram[] | null>(null);
  const uid = user?.uid ?? "";

  useEffect(() => {
    if (!uid) return;
    //const unsub = subscribeDiagramsForUser(uid, setItems);
    //return () => unsub();
  }, [uid]);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([[]]);
 
  const onNodesChange = useCallback((changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback((changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback((params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
  const loading = !items;
  const data = items ?? [];

  async function onNew() {
    if (!uid) return;
    const id = await createDiagram(uid);
    nav(`/diagram/${id}`);
  }

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ width: "100%", marginBottom: 16 }} align="center">
        <Title level={3} style={{ margin: 0 }}>My Diagrams</Title>
        <div style={{ flex: 1 }} />
        <Button type="primary" onClick={onNew}>➕ New Diagram</Button>
      </Space>
<div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
      <Card>
        <List
          loading={loading}
          locale={{ emptyText: <Empty description="No diagrams yet" /> }}
          dataSource={data}
          rowKey={(d) => d.id}
          renderItem={(d) => {
            const role =
              d.ownerUid === uid ? "Owner" :
              d.collaboratorRoles?.[uid] === "editor" ? "Editor" : "Viewer";

            return (
              <List.Item
                actions={[
                  <Button key="open" onClick={() => nav(`/diagram/${d.id}`)}>Open</Button>,
                ]}
              >
                <List.Item.Meta
                  title={<a onClick={() => nav(`/diagram/${d.id}`)}>{d.title || "Untitled"}</a>}
                  description={
                    <Space size="small" wrap>
                      <Tag color={role === "Owner" ? "blue" : role === "Editor" ? "green" : "default"}>
                        {role}
                      </Tag>
                      {d.updatedAt && (
                        <Text type="secondary">
                          Updated {new Date(d.updatedAt.toMillis()).toLocaleString()}
                        </Text>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      </Card>
    </div>
  );
}
