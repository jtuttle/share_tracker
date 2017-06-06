class ShortUrlsList extends React.Component {
  render() {
    var self = this;
    
    var shortUrls = [];
    
    if(this.props.shortUrls != null) {
      shortUrls = this.props.shortUrls;
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
          {shortUrls.map(function(shortUrl, i) {
            return <ShortUrlItem key={i}
                                 shortUrl={shortUrl}
                                 disableMethod={self.props.disableMethod} />
          })}
        </tbody>
      </table>
    );
  }
}
