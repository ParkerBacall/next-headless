export const openDrawer = () => {
  const array = Array.from(document.body.classList);
  const find = array.find((e) => e.startsWith("open") && e.endsWith("Drawer"));
  if (find) document.body.classList.remove(find);
    document.body.classList.add("openOverlay");
    document.body.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('invisible')
  })
};

export const closeDrawer = () => {
  document.body.classList.remove("openOverlay");
    setTimeout(() => {
        document.body.querySelectorAll('.modal').forEach(modal => {
              modal.classList.add('invisible')
        })
    }, 300)
}
