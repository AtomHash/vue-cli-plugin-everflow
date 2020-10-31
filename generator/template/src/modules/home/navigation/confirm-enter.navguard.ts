import { Route } from 'vue-router'

export default (to: Route, from: Route, next: CallableFunction) => {
  const answer = window.confirm('Do you really want to Enter?')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
