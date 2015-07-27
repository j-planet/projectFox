class ItemsController < ApplicationController
  respond_to :json

  def index
    items = Item.all
    respond_with items
  end
end
