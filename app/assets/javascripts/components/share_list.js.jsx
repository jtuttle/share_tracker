class ShareList extends React.Component {
  render() {
    var shareListData = [];
    
    if(this.props.shareListData != null) {
      shareListData = this.props.shareListData;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Visit Count</th>
          </tr>
        </thead>
        <tbody>
          {shareListData.map(function(shareItemData, i) {
            return <ShareItem shareItemData={shareItemData} key={i} />
           })}
        </tbody>
      </table>
    );
  }
}
