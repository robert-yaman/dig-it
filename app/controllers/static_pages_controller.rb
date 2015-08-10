class StaticPagesController < ApplicationController
  def colors #DELETE THIS EVENTUALLY

  end

  def landing

  end

  def root
    unless logged_in?
      redirect_to new_session_url
    end
  end
end
