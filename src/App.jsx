import tree from "./data/SampleTree";
import TreeNode from "./components/TreeNode";
import { useState, useRef } from "react";
import "./styles/tree.css";

function getInorderTraversal(node) {
  if (!node) return [];
  return [
    ...getInorderTraversal(node.left),
    node.value,
    ...getInorderTraversal(node.right),
  ];
}

function getPreorderTraversal(node) {
  if (!node) return [];
  return [
    node.value,
    ...getPreorderTraversal(node.left),
    ...getPreorderTraversal(node.right),
  ];
}

function getPostorderTraversal(node) {
  if (!node) return [];
  return [
    ...getPostorderTraversal(node.left),
    ...getPostorderTraversal(node.right),
    node.value,
  ];
}

export default function App() {
  const [highlight, setHighlight] = useState(null);
  const [result, setResult] = useState([]);
  const intervalRef = useRef(null);

  function handleTraversal(order) {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let nodes = [];
    if (order === "inorder") nodes = getInorderTraversal(tree);
    else if (order === "preorder") nodes = getPreorderTraversal(tree);
    else if (order === "postorder") nodes = getPostorderTraversal(tree);

    setResult([]);
    setHighlight(null);

    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i >= nodes.length) {
        clearInterval(intervalRef.current);
        setHighlight(null);
        return;
      }

      const currentNode = nodes[i];
      setHighlight(currentNode);
      setResult((prev) => [...prev, currentNode]);
      i++;
    }, 1000);
  }

  return (
    <div>
      <h1>Tree Traversal Visualiser</h1>
      <div>
        <button onClick={() => handleTraversal("inorder")}>inorder</button>
        <button onClick={() => handleTraversal("preorder")}>preorder</button>
        <button onClick={() => handleTraversal("postorder")}>postorder</button>
      </div>
      <TreeNode node={tree} highlight={highlight} />
      <div className="result-arr">Traversal Order: {result.join(" ")}</div>
    </div>
  );
}
