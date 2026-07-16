export const CellRenderer = {
  functional: true,
  props: {
    renderFn: Function,
    data: Object
  },
  render(h, ctx) {
    if (!ctx.props.renderFn || !ctx.props.data || !ctx.props.data.row) return null
    return ctx.props.renderFn(ctx.props.data)
  }
}
