import React from "react";

     
export const RemoveButton = ({ nombre }) => {
  const handleClick = async () => {
    if (window.confirm(`Are you sure you want to delete "${nombre}"?`)) {
      try {
        const response = await fetch("http://localhost:3001/api/ficherosRemove", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
        } else {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting file");
      }
    }
  };

  return (
    <button
      type="button"
      className="Remove"
      onClick={handleClick}
      aria-label={`Delete ${nombre}`}
    >
      <span className="remove-icon">×</span>
    </button>
  );
};

export default RemoveButton;