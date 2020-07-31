package com.dovepot.dovepotWeb.repositories;
import org.springframework.data.repository.CrudRepository;
import com.dovepot.dovepotWeb.models.Plan;

public interface PlanRepository extends CrudRepository<Plan, String> {
    @Override
    void delete(Plan deleted);
}