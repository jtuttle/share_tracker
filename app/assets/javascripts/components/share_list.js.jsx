class ShareList extends React.Component {
  render() {
    return (
      <div>
        {this.props.share_data.map(function(share, i) {
          return <ShareItem share_item_data={share} key={i} />
        })}
      </div>
    );
  }
}
