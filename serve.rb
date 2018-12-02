require "sinatra"
require "natto"
require "json"
require "nokogiri"
require "open-uri"

get '/' do
  erb :index
end

get '/conv' do
  text = params[:text]
  result = {}
  return "no value" if text == ""

  natto = Natto::MeCab.new
  natto.parse(text) do |n|
    result[n.surface] = n.feature
  end
  JSON.generate(result)
end

post '/conv/wakati' do
  params = JSON.parse request.body.read
  text = params["text"]
  p params
  return "no value" if text == ""

  natto = Natto::MeCab.new(output_format_type: :wakati)

  JSON.generate(natto.parse(text))
end

post '/conv/web' do
  params = JSON.parse request.body.read
  p params
  url = params["url"].gsub(/\n|\s/, "")
  return "no value" if url == ""

  charset = nil
  opt = {}
  opt['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/XXXXXXXXXXXXX Safari/XXXXXX Vivaldi/XXXXXXXXXX'
  html = open(url,opt) do |f|
    charset = f.charset
    f.read
  end
  doc = Nokogiri::HTML.parse(html, nil, charset)
  natto = Natto::MeCab.new(output_format_type: :wakati)

  JSON.generate(natto.parse(doc.inner_text()))
end
