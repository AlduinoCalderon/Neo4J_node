const neo4j = require('neo4j-driver');

// Configuración del driver de Neo4j
const driver = neo4j.driver("bolt://127.0.0.1:7687", neo4j.auth.basic("neo4j", "password")); 
const session = driver.session();

const getNodesAndEdges = async (req, res) => {
  try {
    const result = await session.run("MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 10");
    const nodes = [];
    const edges = [];

    result.records.forEach(record => {
      const node1Id = record.get('n').identity.low;
      const node2Id = record.get('m').identity.low;
      const relationType = record.get('r').type;

      if (!nodes.some(n => n.id === node1Id)) {
        nodes.push({ id: node1Id, label: JSON.stringify(record.get('n').properties) });
      }
      if (!nodes.some(n => n.id === node2Id)) {
        nodes.push({ id: node2Id, label: JSON.stringify(record.get('m').properties) });
      }

      edges.push({ from: node1Id, to: node2Id, label: relationType });
    });

    res.render('index', { nodes: JSON.stringify(nodes), edges: JSON.stringify(edges) });
  } catch (err) {
    console.log(err);
    res.send('Ocurrió un error');
  }
};

module.exports = { getNodesAndEdges };
