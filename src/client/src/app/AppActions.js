// export const selectActivePanel = (selectedPanel) => {
//   return ({
//     type: "SELECT_ACTIVE_PANEL",
//     selectedPanel
//   })
// }


  export const selectActivePage = (selectedPage) => {
    console.log("selected " + selectedPage)
    return ({
      type: "SELECT_ACTIVE_PAGE",
      selectedPage
    });
  }

export const selectCreateNewEvent = () => ({
    type: "SELECT_CREATE_NEW_EVENT"
  })


// Defect 11, 23
export const selectActivePanel = (selectedPanel) => ({
    type: "SELECT_ACTIVE_PANEL",
    selectedPanel
})