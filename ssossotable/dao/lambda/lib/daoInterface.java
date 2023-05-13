import java.util.List;

public interface Dao {
    void selectAll(columns, table);
    void select(columns, table, where);
    void insert(table, columns, values);
    void update(table, set, where);
    void delete(table where);
}
