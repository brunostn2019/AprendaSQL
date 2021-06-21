package com.sqlpt.sqlptbr.Repository;

import com.sqlpt.sqlptbr.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post,Long> {


}
