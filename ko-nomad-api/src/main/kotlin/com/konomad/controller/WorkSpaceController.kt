package com.konomad.controller

import com.konomad.dto.WorkSpaceResponse
import com.konomad.service.WorkSpaceService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/workspaces")
class WorkSpaceController(
    private val workSpaceService: WorkSpaceService
) {

    @GetMapping
    fun getAllWorkSpaces(
        @RequestParam(required = false) citySlug: String?,
        @RequestParam(required = false) type: String?,
        @RequestParam(required = false, defaultValue = "rating") sort: String
    ): ResponseEntity<List<WorkSpaceResponse>> {
        var workspaces = workSpaceService.getAllWorkSpaces(citySlug, type)

        workspaces = when (sort) {
            "rating" -> workspaces.sortedByDescending { it.rating }
            "wifiSpeed" -> workspaces.sortedByDescending { it.wifiSpeed }
            "reviewCount" -> workspaces.sortedByDescending { it.reviewCount }
            else -> workspaces.sortedByDescending { it.rating }
        }

        return ResponseEntity.ok(workspaces)
    }

    @GetMapping("/city/{slug}")
    fun getWorkSpacesByCitySlug(@PathVariable slug: String): ResponseEntity<List<WorkSpaceResponse>> {
        return ResponseEntity.ok(workSpaceService.getWorkSpacesByCitySlug(slug))
    }
}
