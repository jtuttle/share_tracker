class ShortUrlsList extends React.Component {
  render() {
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
            return <ShortUrlItem shortUrl={shortUrl} key={i} />
           })}
        </tbody>
      </table>
    );
  }
}
