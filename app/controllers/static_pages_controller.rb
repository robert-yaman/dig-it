class StaticPagesController < ApplicationController
  def colors #DELETE THIS EVENTUALLY

  end

  def root
    if logged_in?
      render :root
    else
      render :landing
    end
  end
end
