export const fixtures = {
  dealsV0andV1: [
    {
      status: 'active',
      lastChanged: '2021-09-10T00:45:50.408956+00:00',
      chainDealID: 2424132,
      datamodelSelector: 'Links/19/Hash/Links/46/Hash/Links/0/Hash',
      statusText:
        'containing sector active as of 2021-09-10 00:36:30 at epoch 1097593',
      dealActivation: '2021-09-11T14:11:00+00:00',
      dealExpiration: '2023-02-03T14:11:00+00:00',
      miner: 'f0678914',
      pieceCid:
        'baga6ea4seaqfanmqerzaiq7udm5wxx3hcmgapukudbadjarzkadudexamn5gwny',
      batchRootCid:
        'bafybeiek5gau46j4dxoyty27qtirb3iuoq7aax4l3xt25mfk2igyt35bme',
    },
  ],

  metaplexAuth: {
    // Tokens made before mintingAgent tag was introduced, with old solana-cluster tag name
    v0: {
      bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy: {
        meta: {
          iss: 'did:key:z6Mkh74NGBSqQGqeKa2wVuJyRJ1ZJwPngHPg9V6DY2qnVnA5',
          req: {
            put: {
              rootCID:
                'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy',
              tags: {
                chain: 'solana',
                'solana-cluster': 'devnet',
              },
            },
          },
        },
        token:
          'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaWQ6a2V5Ono2TWtoNzROR0JTcVFHcWVLYTJ3VnVKeVJKMVpKd1BuZ0hQZzlWNkRZMnFuVm5BNSIsInJlcSI6eyJwdXQiOnsicm9vdENJRCI6ImJhZmtyZWlmZXFqb3J3eW1kbWg3N2FyczZ0YnJ0bm83NGdudHNkY3ZxdmN5Y3VjaWRlYmlyaTJlN3F5IiwidGFncyI6eyJjaGFpbiI6InNvbGFuYSIsInNvbGFuYS1jbHVzdGVyIjoiZGV2bmV0In19fX0.V84TeeEbxHa78di8VONueLjPwk_VpFeWvPs70gIvNmedsUnsfG9DPRSi2FLv3wo3vc1PdjdGnvj0ql9dY6hHCA',
      },
    },

    // Tokens made with mintingAgent tag, using "solanaCluster" tag name
    v1: {
      bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy: {
        meta: {
          iss: 'did:key:z6Mkh74NGBSqQGqeKa2wVuJyRJ1ZJwPngHPg9V6DY2qnVnA5',
          req: {
            put: {
              rootCID:
                'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy',
              tags: {
                chain: 'solana',
                solanaCluster: 'devnet',
                mintingAgent: 'metaplex-auth/cli',
                agentVersion: '0.2.3',
              },
            },
          },
        },
        token:
          'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaWQ6a2V5Ono2TWtoNzROR0JTcVFHcWVLYTJ3VnVKeVJKMVpKd1BuZ0hQZzlWNkRZMnFuVm5BNSIsInJlcSI6eyJwdXQiOnsicm9vdENJRCI6ImJhZmtyZWlmZXFqb3J3eW1kbWg3N2FyczZ0YnJ0bm83NGdudHNkY3ZxdmN5Y3VjaWRlYmlyaTJlN3F5IiwidGFncyI6eyJjaGFpbiI6InNvbGFuYSIsInNvbGFuYUNsdXN0ZXIiOiJkZXZuZXQiLCJtaW50aW5nQWdlbnQiOiJtZXRhcGxleC1hdXRoL2NsaSIsImFnZW50VmVyc2lvbiI6IjAuMi4zIn19fX0.03fldV7VjGWnqgVQDj3HypOztOwiZsW3hIic4t1z5Ei00Q6336srZS6EyXsQHXez8sWIDHGBnMWPLqb6aGr3AA',
      },
    },
  },
}
