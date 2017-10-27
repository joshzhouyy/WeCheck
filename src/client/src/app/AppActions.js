export const selectActivePanel = (selectedPanel) => {
  console.log("passed " + selectedPanel);
  return ({
  type: "SELECT_ACTIVE_PANEL",
  selectedPanel
})}