import React from 'react'

const RecipeDeleteModal = ({recipe,onCancel,onAccept}) => {
  const {id,recipe_name} = recipe;
  return (
    // <div className="modal-dialog modal-dialog-centered">
    <div className="modal show" style={{display:"block"}} tabIndex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{recipe_name}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onCancel}></button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to delete this recipe?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onCancel}>Cancel</button>
        <button type="button" className="btn btn-primary" onClick={()=>onAccept(id)}>Delete</button>
      </div>
    </div>
  </div>
</div>
// </div>
  )
}

export default RecipeDeleteModal
