package controllers

import play.api.mvc._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def timeout = Action {
    Thread.sleep(20000)
    Ok
  }
}