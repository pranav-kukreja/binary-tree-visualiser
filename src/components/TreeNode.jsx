function TreeNode({ node, highlight }) {
  if (!node) return null;
  return (
    <div className="tree-node">
      <div
        className={`circle 
            ${highlight === node.value ? "highlight" : ""}` }
      >
        {node.value}
      </div>
      <div className="children">
        <TreeNode node={node.left} highlight={highlight} />
        <TreeNode node={node.right} highlight={highlight} />
      </div>
    </div>
  );
}

export default TreeNode;
