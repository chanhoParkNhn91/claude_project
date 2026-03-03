package com.konomad

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class KoNomadApiApplication

fun main(args: Array<String>) {
	runApplication<KoNomadApiApplication>(*args)
}
