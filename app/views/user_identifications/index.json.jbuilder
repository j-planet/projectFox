json.array!(@user_identifications) do |user_identification|
  json.extract! user_identification, :id, :type, :code, :imgpath, :user_id
  json.url user_identification_url(user_identification, format: :json)
end
