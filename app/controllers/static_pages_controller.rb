class StaticPagesController < ApplicationController
  def colors #DELETE THIS EVENTUALLY

  end

  def landing

  end

  def root
    unless logged_in?
      redirect_to landing_url
    end
  end
end
