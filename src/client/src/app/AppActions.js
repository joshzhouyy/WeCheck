export const selectActivePanel = (selectedPanel) => {
  return ({
    type: "SELECT_ACTIVE_PANEL",
    selectedPanel
  })
}


  export const selectActivePage = (selectedPage) => {
    console.log("selected " + selectedPage)
    return ({
      type: "SELECT_ACTIVE_PAGE",
      selectedPage
    });
  }



// Defect 11, 25
// export const selectActivePanel = (selectedPanel) => {
//     type: "SELECT_ACTIVE_PANEL",
//     selectedPanel
// }