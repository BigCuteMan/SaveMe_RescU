package com.ssafy.smru.repository.elasticsearch;

import com.ssafy.smru.entity.app.MedicineEs;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.CrudRepository;

public interface ElasticSearchRepository extends ElasticsearchRepository<MedicineEs,Long>, CrudRepository<MedicineEs,Long> {

    MedicineEs findByMedicineId(Long medicineId);

}
