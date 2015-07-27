class ReactController < ActionController::Base
  def home
    render layout: 'react'
  end
end
