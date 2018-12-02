require "sinatra"
require "natto"
require "json"

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

get '/conv/web' do

end
