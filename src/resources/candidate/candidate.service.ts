import CandidateI from './candidate.interface';
import CandidateRepository from './candidate.repository';
import HttpException from '../../utils/exceptions/http.exception';
import { request } from 'http';
class CandidateService {
    private CandidateRepository = CandidateRepository;

    /**
     * Create a new Candidate
     */
    public async create(candidate: CandidateI): Promise<CandidateI> {
        try {
            const db_candidate = await this.CandidateRepository.create({candidate});

            return db_candidate;
        } catch (error) {
            throw new Error('Unable to create Candidate');
        }
    }

    /**
     * get all Candidate
     */

    public async getCandidates(): Promise<CandidateI[]> {
        try {
            var db_candidates = await this.CandidateRepository.findAll();
        } catch (error) {
            throw new Error('Unable to retrieve  Candidate');
        }
        return db_candidates;
    }
    public async getCandidateById(candidate_id: number): Promise<CandidateI> {
        try {
            var db_candidate = await this.CandidateRepository.findOne({
                where: { id: candidate_id },
            });
        } catch (error) {
            throw new Error('Unable to retrieve  Candidate');
        }
        if (!db_candidate) throw new HttpException(404, 'entity not found');
        return db_candidate;
    }
    public async deleteCandidate(
        candidate_id: number,
        current_candidate_id: number
    ): Promise<void> {
        try {
            var db_candidate = await this.CandidateRepository.findOne({
                where: { id: candidate_id },
            });
        } catch (error) {
            throw new HttpException(500, "unable load entity ");
        }
        
        if (!db_candidate) throw new HttpException(404, 'entity not found');

        if (db_candidate.id !== current_candidate_id)
            throw new HttpException(403, 'unauthorized');

        try {
            await db_candidate.destroy();
        } catch (error) {
            throw new HttpException(500, "unable delete entity ");
        }
    }
}

export default CandidateService;
