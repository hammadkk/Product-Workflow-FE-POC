

import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  ReactFlowProvider 
} from 'reactflow'; 
import 'reactflow/dist/style.css'; 
import { workflow } from '../utils';
import {CustomNode} from "../../components/Nodes/webhook"
import { ConditionNode } from '../../components/Nodes/condition';
import { ApprovalNode } from '../../components/Nodes/approval';
import { HttpRequestNode } from '../../components/Nodes/httprequest';

const nodeTypes = {
  webhook: CustomNode,
  condition: ConditionNode,
  approval: ApprovalNode,
  httpRequest: HttpRequestNode,
};
const FlowPageContent = () => {
    return (
        <ReactFlow
            nodes={workflow.nodes} 
            edges={workflow.edges} 
            nodeTypes={nodeTypes}
            fitView
        >
            {/* Helper components for a better UX */}
            <MiniMap 
                nodeStrokeColor="#0041d0"
                nodeColor="#fff"
                zoomable pannable
            />
            <Controls />
            <Background color="#aaa" gap={16} />
        </ReactFlow>
    );
};

const FlowPage = () => {
    return (
        <div style={{ height: '90vh', width: '90vw', margin: 0, padding: 0 }}>
            <h2>React Flow Integration: /flow</h2>
            <ReactFlowProvider>
                <FlowPageContent />
            </ReactFlowProvider>
        </div>
    );
};

export default FlowPage;