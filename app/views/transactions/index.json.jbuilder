json.array!(@transactions) do |transaction|
  json.extract! transaction, :id, :fromUser_id, :toUser_id, :fromDate, :toDate, :price
  json.url transaction_url(transaction, format: :json)
end
