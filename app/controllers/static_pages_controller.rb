class StaticPagesController < ApplicationController
  def root
    unless logged_in?
      redirect_to landing_url
    end
  end

  def landing

  end
end
