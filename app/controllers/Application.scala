package controllers

import anorm.SqlParser._
import anorm._
import play.api.Play.current
import play.api.db.DB
import play.api.libs.json.Json
import play.api.mvc._
import play.api.{Routes, Logger, Play}

object Application extends Controller {
  val rowParser = scalar[Long]
  val rsParser = scalar[Long].single

  def index = Action { implicit request =>
    Ok(views.html.index())
  }

  def getCurrentTimeout = Action { implicit request =>
    val timeout: Long = readTimeoutFromDb
    Ok(Json.obj("timeout" -> timeout))
  }

  def setTimeout() = Action { implicit request =>
    request.body.asJson.fold(BadRequest("No request payload")) { json =>
      val newTimeout = (json \ "timeout").as[Long]
      Logger.debug(s"New timeout: $newTimeout")

      val res = DB.withConnection { implicit c =>
        SQL("update Timeout set timeout = {newTimeout}").onParams(newTimeout).executeUpdate()
      }
      Logger.debug(s"Result of update: $res")

      Ok
    }
  }

  def performTimeoutTest() = Action {
    val sleeptime = readTimeoutFromDb
    Logger.debug(s"Sleeping for $sleeptime ms")
    Thread.sleep(sleeptime)

    val resourceData = Play.getExistingFile("conf/charlie.jpg").get
    Ok.sendFile(resourceData)
  }

  private def readTimeoutFromDb: Long = DB.withConnection { implicit c =>
    SQL("select timeout from Timeout")
      .as(scalar[Long].single)
  }

  def javascriptRoutes = Action { implicit request =>
    Ok(
      Routes.javascriptRouter("jsRoutes")(
        controllers.routes.javascript.Application.performTimeoutTest
      )
    ).as("text/javascript")
  }
}