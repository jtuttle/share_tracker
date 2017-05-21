class ShortUrlItem extends React.Component {
  truncate(url) {
    if(url.length < 30) { return url; }
    return url.substr(0, 25) + ' ... ' + url.substr(url.length - 25, url.length);
  }  
  
  render() {
    var shortUrl = this.props.shortUrl;
    
    return (
      <tr>
        <td>
          <a href={shortUrl.original_url}>{this.truncate(shortUrl.original_url)}</a>
        </td>
        <td>
          <a href={shortUrl.small_url}>{shortUrl.small_url}</a>
        </td>
        <td>{shortUrl.visit_count}</td>
      </tr>
    )
  }
}
