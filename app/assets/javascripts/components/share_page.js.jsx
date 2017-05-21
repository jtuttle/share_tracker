class SharePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shareListData: [] }
  }
  
  componentDidMount() {
    var self = this;
    setInterval(function() {
      self.loadShareData();
    }, 5000);

    self.loadShareData();
  }

  loadShareData() {
    var self = this;
    promise.get("http://localhost:3001/urls.json").then(function(error, response, ehr) {
      var shares = JSON.parse(response);
      self.setState({ shareListData: shares.urls });
    });
  }
  
  render() {
    return (
      <ShareList shareListData={this.state.shareListData} />
    )
  }
}
