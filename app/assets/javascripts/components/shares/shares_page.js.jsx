class SharesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortUrls: [],
      createDoneMessage: ''
    }

    this.createShortUrl = this.createShortUrl.bind(this);
  }
  
  componentDidMount() {
    var self = this;
    setInterval(function() {
      self.loadShortUrls();
    }, 5000);

    self.loadShortUrls();
  }

  handleLogout() {
    promise.del("/logout").then(function(error, response, ehr) {
      if(!error) {
        window.location.replace('/login');
      }
    });
  }

  loadShortUrls() {
    var self = this;

    promise.get("http://localhost:3001/urls.json",
                { owner_identifier: this.props.user_identifier }).
            then(function(error, response, ehr) {
      var shortUrls = JSON.parse(response).urls;
      self.setState({ shortUrls: shortUrls });
    });
  }

  createShortUrl(long_url) {
    self = this;
    
    promise.post("http://localhost:3001/url/create",
                 { url: long_url,
                   owner_identifier: this.props.user_identifier }).
            then(function(error, response, ehr) {
      if(error) {
        self.setState({ createDoneMessage: JSON.parse(response).error });
      } else {
        var message = 'Created short URL: ' + JSON.parse(response).url
        self.setState({ value: '', createDoneMessage: message });
      }

      setTimeout(function() {
        self.setState({ createDoneMessage: '' });
      }, 2000);

      self.loadShortUrls();
    });
  }
  
  render() {
    return (
      <div>
        <span id="welcome-span">Welcome {this.props.username}!</span>
        <span id="logout-button">
          <input type="button" value="Logout" onClick={this.handleLogout} />
        </span>
        <div id="url-creator">
          <ShortUrlCreator createMethod={this.createShortUrl}
                           doneMessage={this.state.createDoneMessage}
          />
        </div>
        <ShortUrlsList shortUrls={this.state.shortUrls} />
      </div>
    )
  }
}
