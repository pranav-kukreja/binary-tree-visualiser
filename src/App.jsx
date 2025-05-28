import tree from "./data/SampleTree";
import TreeNode from "./components/TreeNode";
import { useState, useEffect, useRef } from "react";
import "./styles/tree.css";
import "./styles/hero.css"; // make sure hero styles are imported here
import Hero from "./components/Hero";

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

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);
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
    <>
      <Hero />
      <main
        id="visualiser"
        style={{
          padding: "40px 20px",
          backgroundColor: "#f3f4f6",
          minHeight: "100vh",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h1 className="gradient-text">Tree Traversal Visualiser</h1>
        <div style={{ marginBottom: "20px" }}>
          <button
            className="visualising-btn"
            onClick={() => handleTraversal("inorder")}
          >
            Inorder
          </button>
          <button
            className="visualising-btn"
            onClick={() => handleTraversal("preorder")}
          >
            Preorder
          </button>
          <button
            className="visualising-btn"
            onClick={() => handleTraversal("postorder")}
          >
            Postorder
          </button>
        </div>
        <TreeNode node={tree} highlight={highlight} />
        <div className="result-arr" style={{ marginTop: "20px" }}>
          Traversal Order: {result.join(" ")}
        </div>
      </main>
    </>
  );
}
