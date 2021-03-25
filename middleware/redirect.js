export default function ({ route, redirect }) {
  return redirect(route.matched[0].path);
}
