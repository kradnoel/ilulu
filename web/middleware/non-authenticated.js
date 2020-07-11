export default function({ store, redirect }) {
  // If user is authenticated redirect to home page
  if (store.getters.loggedIn) {
    return redirect('/')
  }
}
