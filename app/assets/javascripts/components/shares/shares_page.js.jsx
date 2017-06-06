class SharesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortUrls: [],
      createDoneMessage: ''
    };

    this.createShortUrl = this.createShortUrl.bind(this);
    this.disableShortUrl = this.disableShortUrl.bind(this);
  }
  
  componentDidMount() {
    var self = this;
    
    setInterval(function() {
      self.loadShortUrls();
    }, 5000);
    
    self.loadShortUrls();
  }
  
  componentDidUnmount() {
    
  }

  handleLogout() {
    promise.del("/logout").
      then(function(error, response, ehr) {
        if(!error) {
          window.location.replace('/login');
        }
      });
  }

  loadShortUrls() {
    var self = this;
    
    promise.get(this.props.url_service_host + "/urls.json",
                { owner_identifier: this.props.user_identifier }).
      then(function(error, response, ehr) {
        var shortUrls = JSON.parse(response).urls;
        self.setState({ shortUrls: shortUrls });
      });
  }

  createShortUrl(long_url) {
    var self = this;
    
    promise.post(this.props.url_service_host + "/url/create",
                 { url: long_url,
                   owner_identifier: this.props.user_identifier }).
      then(function(error, response, ehr) {
        if(error) {
          self.setState({ createDoneMessage: JSON.parse(response).error });
        } else {
          var message = 'Created short URL: ' + JSON.parse(response).url;
          self.setState({ value: '', createDoneMessage: message });
        }
        
        setTimeout(function() {
          self.setState({ createDoneMessage: '' });
        }, 2000);
        
        self.loadShortUrls();
      });
  }

  disableShortUrl(url_identifier) {
    var self = this;
    
    promise.del(this.props.url_service_host + "/url/" + url_identifier).
      then(function(error, response, ehr) {
        if(!error) {
          self.loadShortUrls();
        }
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
        <ShortUrlsList shortUrls={this.state.shortUrls}
                       disableMethod={this.disableShortUrl} />
      </div>
    );
  }
}
