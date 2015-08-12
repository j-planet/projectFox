json.array!(@ratings) do |rating|
  json.extract! rating, :id, :by, :stars
  json.url rating_url(rating, format: :json)
end
