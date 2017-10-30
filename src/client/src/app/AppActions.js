export const selectActivePanel = (selectedPanel) => {
  console.log("passed " + selectedPanel);
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