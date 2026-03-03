package com.konomad.service

import com.konomad.dto.WorkSpaceResponse
import com.konomad.entity.WorkSpace
import com.konomad.repository.WorkSpaceRepository
import org.springframework.stereotype.Service

@Service
class WorkSpaceService(
    private val workSpaceRepository: WorkSpaceRepository
) {

    fun getAllWorkSpaces(citySlug: String?, type: String?): List<WorkSpaceResponse> {
        val workspaces = when {
            citySlug != null && type != null -> {
                workSpaceRepository.findByCitySlug(citySlug).filter { it.type == type }
            }
            citySlug != null -> workSpaceRepository.findByCitySlug(citySlug)
            type != null -> workSpaceRepository.findByType(type)
            else -> workSpaceRepository.findAll()
        }
        return workspaces.map { toWorkSpaceResponse(it) }
    }

    fun getWorkSpacesByCitySlug(citySlug: String): List<WorkSpaceResponse> {
        return workSpaceRepository.findByCitySlug(citySlug).map { toWorkSpaceResponse(it) }
    }

    private fun toWorkSpaceResponse(ws: WorkSpace): WorkSpaceResponse {
        return WorkSpaceResponse(
            id = ws.id,
            citySlug = ws.citySlug,
            name = ws.name,
            type = ws.type,
            address = ws.address,
            lat = ws.lat,
            lng = ws.lng,
            outlet = ws.outlet,
            wifiSpeed = ws.wifiSpeed,
            priceRange = ws.priceRange,
            seatComfort = ws.seatComfort,
            noiseLevel = ws.noiseLevel,
            openHours = ws.openHours,
            rating = ws.rating,
            reviewCount = ws.reviewCount,
            tags = if (ws.tags.isBlank()) emptyList() else ws.tags.split(",").map { it.trim() }
        )
    }
}
