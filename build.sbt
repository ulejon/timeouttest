import play.{PlayImport, PlayScala}

name := """timeoutapp"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.1"

libraryDependencies ++= Seq(
  PlayImport.jdbc,
  PlayImport.anorm
)
