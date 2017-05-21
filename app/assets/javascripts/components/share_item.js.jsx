class ShareItem extends React.Component {
  render() {
    console.log(this.props.shareItemData);
    return (
      <tr>
        <td>{this.props.shareItemData.original_url}</td>
        <td>{this.props.shareItemData.small_url}</td>
        <td>{this.props.shareItemData.visit_count}</td>
      </tr>
    )
  }
}
