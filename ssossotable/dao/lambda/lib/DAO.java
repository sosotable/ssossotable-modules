import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DaoImpl implements Dao {

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void selectAll(columns, table) {
        String sql = "SELECT ? FROM ?";
        return jdbcTemplate.query(sql, columns, table);
    }

    @Override
    public void select(columns, table, where) {
        String sql = "SELECT ? FROM ? WHERE id=?";
        return jdbcTemplate.queryForObject(sql, columns, table, where);
    }

    @Override
    public void insert(table, columns, values) {
        if (columns === undefined) {
            String sql = "INSERT INTO ? VALUES (?)";
            jdbcTemplate.update(sql, table, values);
        } else {
            String sql = "INSERT INTO ?(?) VALUES(?)";
            jdbcTemplate.update(sql, table, columns, values);
        }
    }

    @Override
    public void update(table, set, where) {
        String sql = "UPDATE ? SET ? WHERE ?";
        jdbcTemplate.update(sql, table, set, where);
    }

    @Override
    public void delete(table, where) {
        String sql = "DELETE FROM ? WHERE ?";
        jdbcTemplate.update(sql, table, where);
    }
}