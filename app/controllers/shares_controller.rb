class SharesController < RestrictedAccessController
  def index
    @urls = Remote::UrlShortenerService.new.get_urls
  end
end
