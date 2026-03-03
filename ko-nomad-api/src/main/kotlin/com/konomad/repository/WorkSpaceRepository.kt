package com.konomad.repository

import com.konomad.entity.WorkSpace
import org.springframework.data.jpa.repository.JpaRepository

interface WorkSpaceRepository : JpaRepository<WorkSpace, Long> {
    fun findByCitySlug(citySlug: String): List<WorkSpace>
    fun findByType(type: String): List<WorkSpace>
}
