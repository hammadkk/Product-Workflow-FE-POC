export const workflow = {
  "nodes": [
    {
      "id": "n-webhook-001",
      "type": "webhook",
      "position": { "x": 0, "y": 150 },
      "data": { "label": "Webhook" },
      "source": "right"
    },
    {
      "id": "n-condition-001",
      "type": "condition",
       "position": { "x": 250, "y": 150 },
      "data": { "label": "is-item-known" },
      "source": "right",
      "target": "left"
    },
    {
      "id": "n-condition-002",
      "type": "condition",
      "position": { "x": 500, "y": 50 },
      "data": { "label": "Is Rejected Product" },
      "source": "right",
      "target": "left"
    },
    {
      "id": "n-approval-001",
      "type": "approval",
      "position": { "x": 500, "y": 250 },
      "data": { "label": "Approval" },
      "source": "right",
      "target": "left"
    },
    {
      "id": "n-http-003",
      "type": "httpRequest",
      "position": { "x": 750, "y": 50 },
      "data": { "label": "Update Product" },
      "target": "left"
    },
    {
      "id": "n-http-001",
      "type": "httpRequest",
      "position": { "x": 750, "y": 200 },
      "data": { "label": "Approve Product" },
      "target": "left"
    },
    {
      "id": "n-http-002",
      "type": "httpRequest",
      "position": { "x": 750, "y": 300 },
      "data": { "label": "Reject Product" },
      "target": "left"
    }
  ],
  "nodesData": [
    {
      "id": "n-webhook-001",
      "type": "webhook",
      "config": {},
      "params": {},
      "payload": {}
    },
    {
      "id": "n-condition-001",
      "type": "condition",
      "config": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "d02de77e-712d-4625-92f0-1088a3a8ca83",
              "leftValue": "{{ $json.isProductKnown }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals",
                "name": "filter.operator.equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "params": {},
      "payload": {
        "isProductKnown": false
      }
    },
    {
      "id": "n-condition-002",
      "type": "condition",
      "config": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "d02de77e-712d-4625-92f0-1088a3a8ca83",
              "leftValue": "{{ $json.isProductRejected }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals",
                "name": "filter.operator.equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "params": {},
      "payload": {
        "isProductRejected": false
      }
    },
    {
      "id": "n-approval-001",
      "type": "approval",
      "config": {
        "requiredApprovers": ["user1", "user2"],
        "requiredGroup": [
          {
            "id": "group1",
            "minApproverCount": 2
          },
          {
            "id": "dataflowGroup1",
            "minApproverCount": 1
          }
        ],
        "minApproverCount": 1
      },
      "params": {},
      "payload": {}
    },
    {
      "id": "n-http-001",
      "type": "httpRequest",
      "config": {
        "url": "http://localhost:3022/notification-api/mdm-product",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "Prefer": "return=representation",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsd3NpdHh1eW5hZ2FwdHhmd3NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NTI1MDEsImV4cCI6MjA3NTMyODUwMX0.0-5Tz_D3UcY7oWS2BV75rjN33V0j06oEyghGyQJdk1c"
        }
      },
      "params": {},
      "payload": {
        "id": "b7fe85f8-6e5f-460f-984b-1b77aa652529",
        "name": "MacBook Air 13",
        "price": 1099.0,
        "status": "approved"
      }
    },
    {
      "id": "n-http-002",
      "type": "httpRequest",
      "config": {
        "url": "http://localhost:3022/notification-api/mdm-product",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "Prefer": "return=representation",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsd3NpdHh1eW5hZ2FwdHhmd3NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NTI1MDEsImV4cCI6MjA3NTMyODUwMX0.0-5Tz_D3UcY7oWS2BV75rjN33V0j06oEyghGyQJdk1c"
        }
      },
      "params": {},
      "payload": {
        "id": "b7fe85f8-6e5f-460f-984b-1b77aa652529",
        "name": "MacBook Air 13",
        "price": 1099.0,
        "status": "rejected"
      }
    },
    {
      "id": "n-http-003",
      "type": "httpRequest",
      "config": {
        "url": "https://httpbun.com/get?hello=world",
        "method": "GET",
        "headers": {
          "Content-Type": "application/json"
        }
      },
      "params": {},
      "payload": {}
    }
  ],
  "edges": [
    {
      "id": "e-001",
      "source": "n-webhook-001",
      "target": "n-condition-001",
      "type": "dotted",
      "label": "onWebhook"
    },
    {
      "id": "e-010",
      "source": "n-condition-001",
      "target": "n-approval-001",
      "type": "dotted",
      "label": "false"
    },
    {
      "id": "e-011",
      "source": "n-condition-001",
      "target": "n-condition-002",
      "type": "dotted",
      "label": "true"
    },
    {
      "id": "e-012",
      "source": "n-condition-002",
      "target": "n-http-003",
      "type": "dotted",
      "label": "false"
    },
    {
      "id": "e-002",
      "source": "n-approval-001",
      "target": "n-http-001",
      "type": "dotted",
      "label": "approved"
    },
    {
      "id": "e-003",
      "source": "n-approval-001",
      "target": "n-http-002",
      "type": "dotted",
      "label": "rejected"
    }
  ],
  "edgeData": [
    {
      "id": "e-001",
      "config": {},
      "params": {}
    },
    {
      "id": "e-010",
      "config": {
        "route": "false"
      },
      "params": {}
    },
    {
      "id": "e-011",
      "config": {
        "route": "true"
      },
      "params": {}
    },
    {
      "id": "e-012",
      "config": {
        "route": "false"
      },
      "params": {}
    },
    {
      "id": "e-002",
      "config": {
        "route": "true"
      },
      "params": {}
    },
    {
      "id": "e-003",
      "config": {
        "route": "false"
      },
      "params": {}
    }
  ]
};